// Generated code from Butter Knife. Do not modify!
package com.haerul.foodsapp.adapter;

import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.CallSuper;
import androidx.annotation.UiThread;
import butterknife.Unbinder;
import butterknife.internal.Utils;
import com.haerul.foodsapp.R;
import java.lang.IllegalStateException;
import java.lang.Override;

public class RecyclerViewHomeAdapter$RecyclerViewHolder_ViewBinding implements Unbinder {
  private RecyclerViewHomeAdapter.RecyclerViewHolder target;

  @UiThread
  public RecyclerViewHomeAdapter$RecyclerViewHolder_ViewBinding(
      RecyclerViewHomeAdapter.RecyclerViewHolder target, View source) {
    this.target = target;

    target.categoryThumb = Utils.findRequiredViewAsType(source, R.id.categoryThumb, "field 'categoryThumb'", ImageView.class);
    target.categoryName = Utils.findRequiredViewAsType(source, R.id.categoryName, "field 'categoryName'", TextView.class);
  }

  @Override
  @CallSuper
  public void unbind() {
    RecyclerViewHomeAdapter.RecyclerViewHolder target = this.target;
    if (target == null) throw new IllegalStateException("Bindings already cleared.");
    this.target = null;

    target.categoryThumb = null;
    target.categoryName = null;
  }
}
